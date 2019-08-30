<?php

use App\Job;
use Laravel\Lumen\Testing\DatabaseMigrations;

class JobTest extends TestCase
{
    use DatabaseMigrations;

    public function testGetGetJobs()
    {
        $this->get('/jobs');
        $this->assertJson(
            $this->response->getContent()
        );
        $this->assertSame(200, $this->response->getStatusCode());
        $this->assertSame(
            [],
            json_decode($this->response->getContent())
        );
    }

    public function testGetJobById()
    {
        $job = factory('App\Job')->make();
        $job->save();

        $this->get("/job/{$job->id}");
        $this->assertSame(200, $this->response->getStatusCode());
        $this->assertJson(
            $this->response->getContent()
        );
        $this->assertEquals(
            $job->toArray(),
            json_decode($this->response->getContent(), true)
        );
    }

    public function testGetJobWithoutApplicantById()
    {
        $job = factory('App\Job', 'no applicant')->make();
        $job->save();

        $this->get("/job/{$job->id}");
        $this->assertSame(200, $this->response->getStatusCode());
        $this->assertJson(
            $this->response->getContent()
        );
        $this->assertEquals(
            $job->toArray(),
            json_decode($this->response->getContent(), true)
        );
    }

    public function testGetJobWithOneOrMoreApplicantsById()
    {
        $job = factory('App\Job', 'one or more applicant')->make();
        $job->save();

        $this->get("/job/{$job->id}");
        $this->assertSame(200, $this->response->getStatusCode());
        $this->assertJson(
            $this->response->getContent()
        );
        $this->assertEquals(
            $job->toArray(),
            json_decode($this->response->getContent(), true)
        );
    }

    public function testGetJobs()
    {
        $jobs = array_map(
            function (): Job {
                $job = factory('App\Job')->make();
                $job->save();

                return $job;
            },
            range(1, 10)
        );

        $jobsArray = array_map(
            function (Job $job): array {
                $jobArray = array_only(
                    $job->toArray(),
                    [
                        'id',
                        'job title',
                        'date',
                        'location',
                    ]
                );

                return $jobArray;
            },
            $jobs
        );

        $this->get('/jobs');
        $this->assertSame(200, $this->response->getStatusCode());
        $this->assertJson(
            $this->response->getContent()
        );
        $this->assertEquals(
            $jobsArray,
            json_decode($this->response->getContent(), true)
        );
    }
}
