HTTP: Hyper Text Transfer Protocol
In HTTP, ABC sent as ABC from server to client
In HTTPS, ABC is encrypted and sent from server and decrypted using CNS on client side 
URL - Unique Resource Allocator, URI - Identifier, URN - Name

HTTP Headers: Metadata, key value sent along with response and request
Used for caching, authentication, manage state etc

We can even use 400 header for sending data but standards are not meant

Most common headers:
Accept: application/json meaning it will accept only json data 
common nowadays with apis
User: Agent,
Authorization -> Bearer Token 
Content-Type
Cookie
Cache-Control

CORS: 
Access Control Allow Origin,
Access Control Allow Credentials,
Access Control Allow Method

HTTPS Methods: 
GET retrieve
HEAD No message body
OPTIONS What operations are available
TRACE get some data 
DELETE remove resource
PUT replace
POST add or interact
PATCH change part of a resource 

Status Code 

1XX Informational (Continue)
2XX Success
3XX Redirection
4XX Client Error
5XX Server Error
