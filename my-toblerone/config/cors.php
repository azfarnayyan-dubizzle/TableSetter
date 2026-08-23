// config/cors.php
'paths' => ['api/*'],
'allowed_methods' => ['*'],
'allowed_origins' => [
    'https://tablesetter.vercel.app/', // fill in once you have the real Vercel URL
    'http://localhost:3000', // for local development
],
'allowed_headers' => ['*'],
'supports_credentials' => false,