<?php

namespace App\Providers;

use App\Interfaces\OtherGroupeMemberInterface;
use App\Repositories\OtherGroupeMembeRepository;
use Illuminate\Support\ServiceProvider;

class OtherGroupeMembeProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(OtherGroupeMemberInterface::class, OtherGroupeMembeRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
