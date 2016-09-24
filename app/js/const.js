'use strict';

const METHODS = ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'LINK', 'UNLINK', 'OPTIONS'];
const METHOD_GET = 'GET', METHOD_HEAD = 'HEAD', METHOD_POST = 'POST', METHOD_PUT = 'PUT', METHOD_DELETE = 'DELETE';
const METHOD_LINK = 'LINK', METHOD_UNLINK = 'UNLINK', METHOD_OPTIONS = 'OPTIONS';

const CONTENT_TYPES = [
    'application/json', 'application/xml', 'application/atom+xml', 'multipart/form-data',
    'multipart/alternative', 'multipart/mixed', 'application/x-www-form-urlencoded',
    'application/base64', 'application/octet-stream', 'text/plain', 'text/css', 'text/html',
    'application/javascript']

const CONTENT_TYPE_FORM = 'application/x-www-form-urlencoded';
const CONTENT_TYPE_FILE = 'multipart/form-data';