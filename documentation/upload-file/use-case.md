# Upload File

> ## Data
* Arquivo

> ## Primary flow
1. Should upload the file to a temp directory on the file system
2. Should take as a parameter the name of the file to upload/download.
3. Should only accept uploading/downloading a .gz file.

> ## Excpetion flow: Error uploading file
1. Should send an error message if upload fails
