import datetime
import logging
import os
import requests
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient
import azure.functions as func

# Azure Blob Storage bağlantı bilgileri
connect_str = "DefaultEndpointsProtocol=https;AccountName=rguser12190a9;AccountKey=4wtVA7iFPVQINJCU6dDPxqfwLPukg8R8OhfbiaRKYh+8+WCe/b0QpQ8kFtfUgvzqlxtKlBPVSpoL+AStRgwCmg==;EndpointSuffix=core.windows.net"  # Connection string'i ortam değişkeninden al  # Connection string'i ortam değişkeninden al
container_name = "bultenler"
bulletin_blob_name = "bulletin_number.txt"

# Türkiye resmi tatil günleri
holidays = [
    datetime.datetime(2024, 1, 1),
    datetime.datetime(2024, 4, 9), datetime.datetime(2024, 4, 10), datetime.datetime(2024, 4, 11), datetime.datetime(2024, 4, 12),
    datetime.datetime(2024, 4, 23),
    datetime.datetime(2024, 5, 1),
    datetime.datetime(2024, 5, 19),
    datetime.datetime(2024, 6, 15), datetime.datetime(2024, 6, 16), datetime.datetime(2024, 6, 17), datetime.datetime(2024, 6, 18), datetime.datetime(2024, 6, 19),
    datetime.datetime(2024, 7, 15),
    datetime.datetime(2024, 8, 30),
    datetime.datetime(2024, 10, 29)
]

def get_last_bulletin_number():
    try:
        blob_service_client = BlobServiceClient.from_connection_string(connect_str)
        blob_client = blob_service_client.get_blob_client(container=container_name, blob=bulletin_blob_name)
        download_stream = blob_client.download_blob()
        return int(download_stream.readall().decode('utf-8').strip())
    except Exception as e:
        logging.error(f"Reading error: {e}")
        return 0

def save_bulletin_number(number):
    try:
        blob_service_client = BlobServiceClient.from_connection_string(connect_str)
        blob_client = blob_service_client.get_blob_client(container=container_name, blob=bulletin_blob_name)
        blob_client.upload_blob(str(number), overwrite=True)
        logging.info(f"Bulletin number saved in {bulletin_blob_name}.")
    except Exception as e:
        logging.error(f"Bulletin number saving error: {e}")

def download_bulletin(date):
    bulletin_number = get_last_bulletin_number() + 1
    date_str = date.strftime('%d.%m.%Y')

    while True:
        urls = [
            f"https://www.denizyatirim.com/Uploads/Gunluk_Bulten_-{date_str}_{bulletin_number}.pdf",
            f"https://www.denizyatirim.com/Uploads/Gunluk_Bulten_-_{date_str}_{bulletin_number}.pdf"
        ]
        for pdf_url in urls:
            logging.info(f"Trying to dowland: {pdf_url}")
            try:
                response = requests.get(pdf_url)
                logging.info(f"HTTP: {response.status_code} URL: {pdf_url}")
                if response.status_code == 200:
                    file_content = response.content
                    save_bulletin_number(bulletin_number)
                    return file_content, date_str
            except Exception as e:
                logging.error(f"URL'yi loaing error: {pdf_url}, Error: {e}")
        bulletin_number += 1

def upload_to_blob(file_content, date_str):
    try:
        blob_service_client = BlobServiceClient.from_connection_string(connect_str)
        blob_client = blob_service_client.get_blob_client(container=container_name, blob=f"Günlük Bülten {date_str}.pdf")
        blob_client.upload_blob(file_content, overwrite=True)
        logging.info(f"Daily Bulletin {date_str}.pdf succesfully uploaded.")
    except Exception as e:
        logging.error(f"Blob upload error: {e}")

def main(mytimer: func.TimerRequest) -> None:
    try:
        logging.basicConfig(level=logging.INFO)
        utc_timestamp = datetime.datetime.utcnow().replace(tzinfo=datetime.timezone.utc).isoformat()
        logging.info(f'Python timer trigger function ran at {utc_timestamp}')
    except Exception as e:
        logging.error(f"Starting Error: {e}")

    today = datetime(2024,7,16)

    if today.weekday() >= 5:
        logging.info("Weekend")
    elif today in holidays:
        logging.info("Holiday")
    else:
        try:
            file_content, date_str = download_bulletin(today)
            if file_content:
                upload_to_blob(file_content, date_str)
            else:
                logging.error("Bulletin could not dowlanded.")
        except Exception as e:
            logging.error(f"General error: {e}")

# Logları görmek için logging seviyesini ayarlayın
logging.basicConfig(level=logging.INFO)

