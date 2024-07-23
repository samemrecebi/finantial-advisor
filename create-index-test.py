import os
from dotenv import load_dotenv
from azure.storage.blob import BlobServiceClient,BlobClient,ContainerClient
from azure.search.documents import SearchClient
from azure.search.documents.indexes import SearchIndexClient
from azure.search.documents.indexes.models import SearchIndex, SimpleField, SearchableField,ComplexField, _edm
from azure.core.credentials import AzureKeyCredential
from azure.ai.formrecognizer import DocumentAnalysisClient


load_dotenv()

azure_search_endpoint = os.getenv('AZURE_SEARCH_ENDPOINT')
azure_search_key = os.getenv('AZURE_SEARCH_KEY')
azure_search_index = os.getenv('AZURE_SEARCH_INDEX')
azure_storage_connection_string = os.getenv('AZURE_BLOB_CONNECTION_STRING')
azure_blob_container_name = os.getenv('AZURE_BLOB_CONTAINER_NAME')
azure_document_intelligence_endpoint = os.getenv('AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT')
azure_document_intelligence_key = os.getenv('AZURE_DOCUMENT_INTELLIGENCE_KEY')

def create_search_index():
    index_client = SearchIndexClient(azure_search_endpoint, AzureKeyCredential(azure_search_key))

    fields = [
        SimpleField(name='id', type=_edm.String, key=True),
        SearchableField(name='content', type=_edm.String)
    ]

    index = SearchIndex(name=azure_search_index, fields=fields)

    index_client.create_index(index)

def extract_text_from_document(blob_service_client, container_name, blob_name):
    document_analysis_client = DocumentAnalysisClient(azure_document_intelligence_endpoint, AzureKeyCredential(azure_document_intelligence_key))

    blob_client = blob_service_client.get_blob_client(container=container_name, blob=blob_name)

    pdf_content = blob_client.download_blob().readall()

    poller = document_analysis_client.begin_analyze_document('prebuilt-receipt', pdf_content)

    result = poller.result()

    text = ''
    for page in result.pages:
        for line in page.lines:
            text += line.content + '\n'

    return text

def sanitize_key(key):
    return key.replace('.', '_').replace(' ', '_')

def index_documents(search_client, documents, chunk_size=1024):
    for i in range(0, len(documents), chunk_size):
        chunk = documents[i:i + chunk_size]
        results = search_client.upload_documents(documents=chunk)

        for result in results:
            if result.succeeded:
                print(f'Document {result.key} uploaded to index')
            else:
                print(f'Failed to upload document {result.key}')

def main():
    blob_service_client = BlobServiceClient.from_connection_string(azure_storage_connection_string)

    search_client = SearchClient(azure_search_endpoint, azure_search_index, AzureKeyCredential(azure_search_key))
    create_search_index()

    documents = []

    container_client = blob_service_client.get_container_client(azure_blob_container_name)

    blobs_list = container_client.list_blobs()

    for blob in blobs_list:
        if blob.name.endswith('.pdf'):
            pdf_text = extract_text_from_document(blob_service_client, azure_blob_container_name, blob.name)
            sanitized_key = sanitize_key(blob.name)
            documents.append({'id': sanitized_key, 'content': pdf_text})

    index_documents(search_client, documents)
    print('Indexing completed')
                         
if __name__ == "__main__":
    
    main()
