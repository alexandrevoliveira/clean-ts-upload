# Upload File

> ## Data

- Input:
```
type HttpRequest = {
  file: {
    buffer: Buffer
    mimeType: string
    fileName: string
  }
}
```

> ## Success flow
1. ✅ Should upload the file to a temp directory on the file system.
2. ✅ Should upload an unique file.
3. ✅ Should only upload a **.gz** file.
4. ✅ Should receive a **POST** request on route **/api/files/upload**.
5. ✅ Should return **200** if upload succeeds.

> ## Excpetion flow: Error uploading file
1. ✅ Should send an error message if upload fails.
2. ✅ Should return **404** if the API does not exists.
3. ✅ Should return **400** if file is not attached.
4. ✅ Should return **500** if upload fails.
