# Simples File Service

A simples file service that offer a upload and download of files.

## USAGE

First of all, you must have docker and docker-compose installed to use this API.

```bash
Steps to build the API:

Use git clone in this repository

On directory of this project, run the command docker-compose up

It is ready to use in the port 3000 of your machine
```

API:

```
• GET /
    - Route to get a file or a directory.
    - body: {
        "dirPath": path of file or dir. (optional)
        "filename": filename with extension (optional)
        }
• POST /
    - Route to post a file with allowed extension (.pdf, .xml, .txt)
    - files: File that you want to upload.
    - body: {
        "optionalPath": path for file upload (optional).
        }

• DELETE /
    - Route to delete a file or a dir.
    - body: {
        "filename": filename with extension
        "dirPath": Path of dir.
        *You must send one of them.
    }
```
