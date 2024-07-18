# -*- coding: utf-8 -*-
"""bulten.ipynb

Automatically generated by Colab.

Original file is located at
    https://colab.research.google.com/drive/1zRXbB042MUA5Y9RUJrYWtMfnrHdbQsoJ
"""

import requests
from azure.storage.blob import BlobServiceClient
import os
from datetime import datetime, timedelta

# Azure Blob Storage 
connect_str = "DefaultEndpointsProtocol=https;AccountName=rguser12190a9;AccountKey=4wtVA7iFPVQINJCU6dDPxqfwLPukg8R8OhfbiaRKYh+8+WCe/b0QpQ8kFtfUgvzqlxtKlBPVSpoL+AStRgwCmg==;EndpointSuffix=core.windows.net"  # Bu bilgiyi kendi Azure hesabınızdan alın
container_name = "bultenler"  # Kendi container isminizi yazın

bulletin_file = r'C:\Users\user121\Desktop\bulletin_number.txt'

holidays = [
    datetime(2024, 1, 1),
    datetime(2024, 4, 9), datetime(2024, 4, 10), datetime(2024, 4, 11), datetime(2024, 4, 12),
    datetime(2024, 4, 23),
    datetime(2024, 5, 1),
    datetime(2024, 5, 19),
    datetime(2024, 6, 15), datetime(2024, 6, 16), datetime(2024, 6, 17), datetime(2024, 6, 18), datetime(2024, 6, 19),
    datetime(2024, 7, 15),
    datetime(2024, 8, 30),
    datetime(2024, 10, 29)
]

def get_last_bulletin_number():
    if os.path.exists(bulletin_file):
        with open(bulletin_file, 'r') as file:
            return int(file.read().strip())
  

def save_bulletin_number(number):
    with open(bulletin_file, 'w') as file:
        file.write(str(number))
    print(f"Bülten numarası {os.path.abspath(bulletin_file)} dosyasına kaydedildi.")

def download_bulletin(date):
    bulletin_number = get_last_bulletin_number() + 1
    date_str = date.strftime('%d.%m.%Y')

    while True:
        urls = [
            f"https://www.denizyatirim.com/Uploads/Gunluk_Bulten_-{date_str}_{bulletin_number}.pdf",
            f"https://www.denizyatirim.com/Uploads/Gunluk_Bulten_-_{date_str}_{bulletin_number}.pdf"
        ]
        for pdf_url in urls:
            print(f"URL'yi yükleme deneniyor: {pdf_url}")
            response = requests.get(pdf_url)
            if response.status_code == 200:
                file_content = response.content
                save_bulletin_number(bulletin_number)
                return file_content, date_str
        bulletin_number += 1

def upload_to_blob(file_content, date_str):
    blob_service_client = BlobServiceClient.from_connection_string(connect_str)
    blob_client = blob_service_client.get_blob_client(container=container_name, blob=f"Günlük Bülten {date_str}.pdf")
    blob_client.upload_blob(file_content, overwrite=True)

today = datetime.today()

#Weekend and Holiday Check
if today.weekday() >= 5:
    print("Weekend")
elif today in holidays:
    print("Holiday")
else:
    # Bülteni indir ve yükle
    file_content, date_str = download_bulletin(today)
    upload_to_blob(file_content, date_str)
    print(f"Daily Bulletin {date_str}.pdf succesfully uploaded.")


print(f"Script Path: {os.getcwd()}")
