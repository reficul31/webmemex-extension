/* eslint-env jest */

import freezeDry from 'src/freeze-dry/index'

jest.mock('jsdom')

const htmlString = `
<!doctype html>
<html>
<head>
    <title>Example Domain</title>

    <meta charset="utf-8" />
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" type="text/css" href="https://example.com/theme.css">
    <style type="text/css">
    body {
        background-image: url("https://example.com/background.png")
        background-color: #f0f0f2;
        margin: 0;
        padding: 0;
        font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
        
    }
    div {
        width: 600px;
        margin: 5em auto;
        padding: 50px;
        background-color: #fff;
        border-radius: 1em;
    }
    a:link, a:visited {
        color: #38488f;
        text-decoration: none;
    }
    @media (max-width: 700px) {
        body {
            background-color: #fff;
        }
        div {
            width: auto;
            margin: 0 auto;
            border-radius: 0;
            padding: 1em;
        }
    }
    </style>

    <script>
        alert('hello')
    </script>    
    <noscript>Your browser doesn't support JavaScript</noscript>
</head>

<body>
<div>
    <h1 href="javascript:alert('Title Clicked')">Example Domain</h1>
    <img src="https://example.com/public/image/background.png" />
    <p style="color:red">This domain is established to be used for illustrative examples in documents. You may use this
    domain in examples without prior coordination or asking for permission.</p>
    <p style="color:blue"><a href="http://www.iana.org/domains/example">More information...</a></p>
    <div onmouseover="handler()">Button</div>
    <a href="otherpage#home">Link</a>
    <div style="background-image: url('https://example.com/background.png')">
    </div>
</div>
</body>
</html>

`

describe('App Test', () => {
    const parser = new DOMParser()

    test('should do something', async () => {
        const docUrl = 'https://example.com'
        const doc = parser.parseFromString(htmlString, 'text/html')
        const html = await freezeDry(doc, docUrl)
        console.log(html)
    })
})