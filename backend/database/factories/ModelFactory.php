<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$factory->define(App\User::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->email,
    ];
});

$factory->define(App\Job::class, function (Faker\Generator $faker): array {
    $numberOfApplicants = $faker->numberBetween(0, 10);
    $applicants = array_map(
        function() use ($faker) :string {
            return $faker->name;
        },
        range(1, $numberOfApplicants)
    );

    return [
        'job title' => $faker->jobTitle,
        'job description' => $faker->sentence,
        'date' => $faker->date(),
        'location' => $faker->city,
        'applicants' => implode(',', $applicants),
    ];
});

$factory->defineAs(App\Job::class, 'no applicant', function (Faker\Generator $faker): array {
    return [
        'job title' => $faker->jobTitle,
        'job description' => $faker->sentence,
        'date' => $faker->date(),
        'location' => $faker->city,
        'applicants' => '',
    ];
});

$factory->defineAs(App\Job::class, 'one or more applicant', function (Faker\Generator $faker): array {
    $numberOfApplicants = $faker->numberBetween(1, 10);
    $applicants = array_map(
        function() use ($faker) :string {
            return $faker->name;
        },
        range(1, $numberOfApplicants)
    );

    return [
        'job title' => $faker->jobTitle,
        'job description' => $faker->sentence,
        'date' => $faker->date(),
        'location' => $faker->city,
        'applicants' => implode(',', $applicants),
    ];
});
