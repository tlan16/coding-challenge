<?php

namespace App\Http\Controllers;

use App\Job;
use Illuminate\Database\Eloquent\Collection;

class JobController extends Controller
{
    public function list(): Collection
    {
        $jobs = Job::select([
            'id',
            'job title',
            'location',
            'date',
        ])->get();

        return $jobs;
    }

    public function get(int $id): Job
    {
        $job = Job::findOrFail($id);

        return $job;
    }
}
