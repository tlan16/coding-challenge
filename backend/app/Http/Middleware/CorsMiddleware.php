<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CorsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @param string $methods column separated string values of allowed method(s)
     *
     * @return mixed
     */
    public function handle($request, Closure $next, string $methods = '')
    {
        $headers = $this->getHeaders($methods);

        if ($request->isMethod('OPTIONS')) {
            return response('', 204, $headers);
        }

        $response = $next($request);
        foreach ($headers as $key => $value) {
            $response->header($key, $value);
        }

        return $response;
    }

    private function getHeaders(string $methodString): array
    {
        $headers = [
            'Access-Control-Allow-Origin' => '*',
            'Access-Control-Allow-Methods' => $this->getAccessControlAllowMethodsHeaderValue($methodString),
            'Access-Control-Allow-Credentials' => 'true',
            'Access-Control-Max-Age' => '86400',
            'Access-Control-Allow-Headers' => 'Content-Type, Authorization, X-Requested-With',
        ];

        return $headers;
    }

    private function getAccessControlAllowMethodsHeaderValue(string $methodString): string
    {
        $methods = explode(':', $methodString);
        $methods[] = 'OPTIONS';
        $methods = array_unique($methods);

        $result = implode(',', $methods);

        return $result;
    }
}
