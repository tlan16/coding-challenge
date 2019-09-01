<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

use App\Http\Middleware\CorsMiddleware;

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(
    [
        'name' => 'get jobs',
        'prefix' => '/jobs',
        'middleware' => CorsMiddleware::class . ':GET',
    ],
    function () use ($router): void {
        $router->options('', []);

        $router->get('', [
            'as' => 'jobs',
            'uses' => 'JobController@list',
        ]);
    }
);

$router->group(
    [
        'name' => 'get a job',
        'prefix' => '/job/{id:\d+}',
        'middleware' => CorsMiddleware::class . ':GET',
    ],
    function () use ($router) : void {
        $router->options('', []);

        $router->get('', [
            'as' => 'jobs',
            'uses' => 'JobController@get',
        ]);
    }
);
