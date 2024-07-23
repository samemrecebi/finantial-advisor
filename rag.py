import os
import openai
import dotenv
import logging
import time

dotenv.load_dotenv()

# Loglama ayarları
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

try:
    endpoint = os.getenv("AZURE_OAI_ENDPOINT")
    if not endpoint:
        raise ValueError("AZURE_OAI_ENDPOINT environment variable not found")
    logging.debug(f"Endpoint loaded: {endpoint}")

    api_key = os.getenv("AZURE_OAI_KEY")
    if not api_key:
        raise ValueError("AZURE_OAI_KEY environment variable not found")
    logging.debug("API key loaded successfully")

    deployment = os.getenv("AZURE_OAI_DEPLOYMENT")
    if not deployment:
        raise ValueError("AZURE_OAI_DEPLOYMENT environment variable not found")
    logging.debug(f"Deployment loaded: {deployment}")

    client = openai.AzureOpenAI(
        base_url=f"{endpoint}/openai/deployments/{deployment}/extensions",
        api_key=api_key,
        api_version="2023-08-01-preview"
    )
    logging.debug("OpenAI client initialized successfully")
except Exception as e:
    logging.error(f"Initialization error: {e}")
    print(f"Initialization error: {e}")
    exit(1)

def main():
    try:
        while True:
            text = input("\nEnter the prompt:\n")
            if text.lower() == "exit":
                print("Exiting...")
                break

            logging.debug(f"Received input: {text}")
            start_time = time.time()

            try:
                logging.debug("Sending request to Azure OpenAI")
                response = client.chat.completions.create(
                    temperature = 0.7,
                    max_tokens= 4096,
                    top_p = 0.95,

                    model=deployment,  # gpt-4.0
                    messages=[
                        {
                            "role": "user",
                            "content": text
                        },
                    ],
                    extra_body={
                        "dataSources": [
                            {
                                "type": "AzureCognitiveSearch",
                                "parameters": {
                                    "endpoint": os.environ["AZURE_SEARCH_ENDPOINT"],
                                    "key": os.environ["AZURE_SEARCH_KEY"],
                                    "indexName": os.environ["AZURE_SEARCH_INDEX"],
                                    "query_type": "keyword",
                                }
                            }
                        ]
                    },
                    timeout=20  # Zaman aşımı süresini 20 saniye olarak ayarla
                )

                logging.debug(f"Received response: {response}")
                print(response.choices[0].message.content)
            except Exception as e:
                logging.error(f"Error during API request: {e}")
                print(f"Error during API request: {e}")
            
            end_time = time.time()
            logging.debug(f"Request duration: {end_time - start_time} seconds")
    except Exception as e:
        logging.error(f"An error occurred: {e}")
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()
