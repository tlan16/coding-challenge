<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JobsTableSeeder extends Seeder
{
    /**
     * @var string[]
     */
    private $dataFixtures = [
        __DIR__.'/fixtures/jobs.csv',
    ];

    /**
     * Run the database seeds.
     *
     * @throws Exception
     */
    public function run(): void
    {
        foreach ($this->dataFixtures as $dataFixture) {
            $jobs = $this->readJobsFromCsv($dataFixture);
            DB::table('jobs')->insert($jobs);
        }
    }

    /**
     * @param string $csvPath
     *
     * @return array
     *
     * @throws Exception
     */
    private function readJobsFromCsv(string $csvPath): array
    {
        $jobs = [];
        $indexes = [];
        $row = 1;
        if (false !== ($handle = fopen($csvPath, 'r'))) {
            while (false !== ($data = fgetcsv($handle, 1000, ','))) {
                if (1 === $row) {
                    $indexes = $data;
                    ++$row;
                    continue;
                }

                ++$row;

                $job = [];
                foreach ($data as $index => $value) {
                    if (false === array_key_exists($index, $indexes)) {
                        break;
                    }
                    $index = $indexes[$index];
                    $value = $this->parseFixtureData($index, $value);
                    $job[$index] = $value;
                }

                $now = new DateTimeImmutable();
                $job['created_at'] = $now;
                $job['updated_at'] = $now;
                $jobs[] = $job;
            }
            fclose($handle);
        }

        return $jobs;
    }

    private function parseFixtureData(string $index, $value): string
    {
        switch ($index) {
            case 'date':
                return DateTime::createFromFormat('d/m/Y', (string) $value, new DateTimeZone('UTC'))->format('Y-m-d');
            default:
                return $value;
        }
    }
}
