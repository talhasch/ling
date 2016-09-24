(() => {
    'use strict';

    // from https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
    const statusCodes = {
        // 1xx Informational
        '100': { 'msg': 'Continue', 'cls': 'info' },
        '101': { 'msg': 'Switching Protocols', 'cls': 'info' },
        '102': { 'msg': 'Processing', 'cls': 'info' },

        // 2xx Success
        '200': { 'msg': 'OK', 'cls': 'success' },
        '201': { 'msg': 'Created', 'cls': 'success' },
        '202': { 'msg': 'Accepted', 'cls': 'success' },
        '203': { 'msg': 'Non-Authoritative Information', 'cls': 'success' },
        '204': { 'msg': 'No Content', 'cls': 'success' },
        '205': { 'msg': 'Reset Content', 'cls': 'success' },
        '206': { 'msg': 'Partial Content', 'cls': 'success' },
        '207': { 'msg': 'Multi-Status', 'cls': 'success' },
        '208': { 'msg': 'Already Reported', 'cls': 'success' },
        '226': { 'msg': 'IM Used', 'cls': 'success' },

        // 3xx Redirection
        '300': { 'msg': 'Multiple Choices', 'cls': 'redir' },
        '301': { 'msg': 'Moved Permanently', 'cls': 'redir' },
        '302': { 'msg': 'Found', 'cls': 'redir' },
        '303': { 'msg': 'See Other', 'cls': 'redir' },
        '304': { 'msg': 'Not Modified', 'cls': 'redir' },
        '305': { 'msg': 'Use Proxy', 'cls': 'redir' },
        '306': { 'msg': 'Switch Proxy', 'cls': 'redir' },
        '307': { 'msg': 'Temporary Redirect', 'cls': 'redir' },
        '308': { 'msg': 'Permanent Redirect', 'cls': 'redir' },

        // 4xx Client Error
        '400': { 'msg': 'Bad Request', 'cls': 'client-err' },
        '401': { 'msg': 'Unauthorized', 'cls': 'client-err' },
        '402': { 'msg': 'Payment Required', 'cls': 'client-err' },
        '403': { 'msg': 'Forbidden', 'cls': 'client-err' },
        '404': { 'msg': 'Not Found', 'cls': 'client-err' },
        '405': { 'msg': 'Method Not Allowed', 'cls': 'client-err' },
        '406': { 'msg': 'Not Acceptable', 'cls': 'client-err' },
        '407': { 'msg': 'Proxy Authentication Required', 'cls': 'client-err' },
        '408': { 'msg': 'Request Timeout', 'cls': 'client-err' },
        '409': { 'msg': 'Conflict', 'cls': 'client-err' },
        '410': { 'msg': 'Gone', 'cls': 'client-err' },
        '411': { 'msg': 'Length Required', 'cls': 'client-err' },
        '412': { 'msg': 'Precondition Failed', 'cls': 'client-err' },
        '413': { 'msg': 'Payload Too Large', 'cls': 'client-err' },
        '414': { 'msg': 'URI Too Long', 'cls': 'client-err' },
        '415': { 'msg': 'Unsupported Media Type', 'cls': 'client-err' },
        '416': { 'msg': 'Range Not Satisfiable', 'cls': 'client-err' },
        '417': { 'msg': 'Expectation Failed', 'cls': 'client-err' },
        '418': { 'msg': "I'm a teapot", 'cls': 'client-err' },
        '421': { 'msg': 'Misdirected Request', 'cls': 'client-err' },
        '422': { 'msg': 'Unprocessable Entity', 'cls': 'client-err' },
        '423': { 'msg': 'Locked', 'cls': 'client-err' },
        '424': { 'msg': 'Failed Dependency', 'cls': 'client-err' },
        '426': { 'msg': 'Upgrade Required', 'cls': 'client-err' },
        '428': { 'msg': 'Precondition Required', 'cls': 'client-err' },
        '429': { 'msg': 'Too Many Requests', 'cls': 'client-err' },
        '431': { 'msg': 'Request Header Fields Too Large', 'cls': 'client-err' },
        '451': { 'msg': 'Unavailable For Legal Reasons', 'cls': 'client-err' },

        // 5xx Server Error
        '500': { 'msg': 'Internal Server Error', 'cls': 'server-err' },
        '501': { 'msg': 'Not Implemented', 'cls': 'server-err' },
        '502': { 'msg': 'Bad Gateway', 'cls': 'server-err' },
        '503': { 'msg': 'Service Unavailable', 'cls': 'server-err' },
        '504': { 'msg': 'Gateway Timeout', 'cls': 'server-err' },
        '505': { 'msg': 'HTTP Version Not Supported', 'cls': 'server-err' },
        '506': { 'msg': 'Variant Also Negotiates', 'cls': 'server-err' },
        '507': { 'msg': 'Insufficient Storage', 'cls': 'server-err' },
        '508': { 'msg': 'Loop Detected', 'cls': 'server-err' },
        '510': { 'msg': 'Not Extended', 'cls': 'server-err' },
        '511': { 'msg': 'Network Authentication Required', 'cls': 'server-err' },

        // Internet Information Services
        '440': { 'msg': 'Login Timeout', 'cls': 'iis' },
        '449': { 'msg': 'Retry With', 'cls': 'iis' },

        // nginx
        '444': { 'msg': 'No Response', 'cls': 'nginx' },
        '495': { 'msg': 'SSL Certificate Error', 'cls': 'nginx' },
        '496': { 'msg': 'SSL Certificate Required', 'cls': 'nginx' },
        '497': { 'msg': 'HTTP Request Sent to HTTPS Port', 'cls': 'nginx' },
        '499': { 'msg': 'Client Closed Request', 'cls': 'nginx' },

        // CloudFlare
        '520': { 'msg': 'Unknown Error', 'cls': 'cloudflare' },
        '521': { 'msg': 'Web Server Is Down', 'cls': 'cloudflare' },
        '522': { 'msg': 'Connection Timed Out', 'cls': 'cloudflare' },
        '523': { 'msg': 'Origin Is Unreachable', 'cls': 'cloudflare' },
        '524': { 'msg': 'A Timeout Occurred', 'cls': 'cloudflare' },
        '525': { 'msg': 'SSL Handshake Failed', 'cls': 'cloudflare' },
        '526': { 'msg': 'Invalid SSL Certificate', 'cls': 'cloudflare' }
    };

    app.directive("responseStatus", () => {
        return {
            scope: {
                code: '@'
            },
            link: (scope, element, attrs) => {
                scope.$watch('code', (val) => {
                    if (val) {
                        scope.text = '';
                        scope.class = '';
                        if (statusCodes[val] != undefined) {
                            scope.text = statusCodes[val].msg;
                            scope.class = statusCodes[val].cls;
                        }
                    }
                });
            },
            template: '<div class="status-text {{class}}">{{code}} - {{text}}</div>'
        }
    })
})();


