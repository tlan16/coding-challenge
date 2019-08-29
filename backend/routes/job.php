<?php

$router->get('/jobs', [
    'as' => 'jobs',
    'uses' => 'JobController@list',
]);

$router->get('/job/{id:\d+}', [
    'as' => 'jobs',
    'uses' => 'JobController@get',
]);
