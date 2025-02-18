<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class PruneSessions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sessions:prune';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Prune expired sessions from the sessions table';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $lifetime = config('session.lifetime') * 60;
        $expiration = Carbon::now()->subSeconds($lifetime)->timestamp;

        $deleted = DB::table('sessions')
            ->where('last_activity', '<', $expiration)
            ->delete();

        $this->info("Pruned {$deleted} expired session(s).");
    }
}
