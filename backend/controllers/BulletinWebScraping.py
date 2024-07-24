import requests
from azure.storage.blob import BlobServiceClient
import os
from datetime import datetime
from bs4 import BeautifulSoup

# Azure Blob Storage connection string
connect_str = "DefaultEndpointsProtocol=https;AccountName=rgacademy4str;AccountKey=Ad/3+rnVXNOqmuvtlBEEg/lywh2Uc7PGWYRRjlm78JZuGH5pngjRSeTQWvtHZn1dVZWNAKteK/Z1+AStWo0ZWA==;EndpointSuffix=core.windows.net"
container_name = "bulletinpdfs"


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


def download_denizbank_bulletin(date):
    date_str = date.strftime('%d.%m.%Y')
    url = "https://www.denizyatirim.com/ResearchNotes/DailyNewsletter"
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        headers = soup.find_all('h3', class_='title')
        for header in headers:
            if date_str in header.text:
                button = header.find_next('button', class_='modal-button')
                if button:
                    detail_url = button['data-ajax-href']
                    detail_response = requests.get(f"https://www.denizyatirim.com/{detail_url}")
                    if detail_response.status_code == 200:
                        detail_soup = BeautifulSoup(detail_response.content, 'html.parser')
                        pdf_link = detail_soup.find('a', class_='button big')['href']
                        pdf_url = f"https://www.denizyatirim.com{pdf_link}"
                        response = requests.get(pdf_url)
                        if response.status_code == 200:
                            return response.content, date_str
    return None, None
def download_yapikredi_bulletin(date):
    date_str = date.strftime('%d.%m.%Y')
    url = "https://www.yapikredi.com.tr/yapi-kredi-hakkinda/piyasa-bulteni"

    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        bulletin_links = soup.find_all('td', class_='firstTd')
        for link in bulletin_links:
            if date_str in link.text:
                pdf_link = link.find_next('a')['href']
                pdf_url = f"https://www.yapikredi.com.tr{pdf_link}"
                response = requests.get(pdf_url)
                if response.status_code == 200:
                    return response.content, date_str
    return None, None

def download_isbank_bulletin(date):
    date_str = date.strftime('%d.%m.%Y')
    url = "https://ekonomi.isbank.com.tr/tr/Sayfalar/haftalik-bulten.aspx"

    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        bulletin_links = soup.find_all('a', class_='linktotarget')
        for link in bulletin_links:
            if date_str in link.text:
                pdf_link = link['href']
                pdf_url = f"https://ekonomi.isbank.com.tr{pdf_link}"
                response = requests.get(pdf_url)
                if response.status_code == 200:
                    return response.content, date_str
    return None, None

def download_tacirler_bulletin(date):
    date_str = date.strftime('%d.%m.%Y')
    url = "https://tacirler.com.tr/arastirma/gunluk-bulten/"
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        items = soup.find_all('div', class_='category-list-item')
        for item in items:
            if date_str in item.text:
                detail_link = item.find('a', href=True)['href']

                detail_url = f"{detail_link}"
                detail_response = requests.get(detail_url)
                if detail_response.status_code == 200:
                    detail_soup = BeautifulSoup(detail_response.content, 'html.parser')
                    pdf_link = detail_soup.find('a', class_='btn btn-p ra-pill px-3 dosya')['href']
                    pdf_url = f"{pdf_link}"
                    pdf_response = requests.get(pdf_url)
                    if pdf_response.status_code == 200:
                        return pdf_response.content, date_str
    return None, None

def upload_to_blob(file_content, date_str, bank_name):
    blob_service_client = BlobServiceClient.from_connection_string(connect_str)
    blob_client = blob_service_client.get_blob_client(container=container_name, blob=f"{bank_name} Daily Bulletin {date_str}.pdf")
    blob_client.upload_blob(file_content, overwrite=True)

today = datetime.today()

# Weekend and Holiday Check
if today.weekday() >= 5:
    print("Weekend")
elif today in holidays:
    print("Holiday")
else:
    # Download and upload Denizbank Bulletin
    denizbank_content, denizbank_date_str = download_denizbank_bulletin(today)
    if denizbank_content:
        upload_to_blob(denizbank_content, denizbank_date_str, "Denizbank")
        print(f"Denizbank Daily Bulletin {denizbank_date_str}.pdf successfully uploaded.")

    # Download and upload Yapı Kredi Bulletin
    yapikredi_content, yapikredi_date_str = download_yapikredi_bulletin(today)
    if yapikredi_content:
        upload_to_blob(yapikredi_content, yapikredi_date_str, "Yapı Kredi")
        print(f"Yapı Kredi Daily Bulletin {yapikredi_date_str}.pdf successfully uploaded.")

    # Download and upload İş Bankası Bulletin (only on Fridays)
    if today.weekday() == 4:  # 4 Friday
        isbank_content, isbank_date_str = download_isbank_bulletin(today)
        if isbank_content:
            upload_to_blob(isbank_content, isbank_date_str, "Isbank")
            print(f"Isbank Weekly Bulletin {isbank_date_str}.pdf successfully uploaded.")
    else:
        print("Isbank Weekly Bulletin will be downloaded on Friday.")


    # Download and upload Tacirler Yatırım Bulletin
    tacirler_content, tacirler_date_str = download_tacirler_bulletin(today)
    if tacirler_content:
        upload_to_blob(tacirler_content, tacirler_date_str, "Tacirler")
        print(f"Tacirler Daily Bulletin {tacirler_date_str}.pdf successfully uploaded.")


print(f"Script Path: {os.getcwd()}")