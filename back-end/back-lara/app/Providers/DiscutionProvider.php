<?php

namespace App\Providers;

use App\Interfaces\DiscutionInterface;
use App\Repositories\DiscutionRepository;
use Illuminate\Support\ServiceProvider;

class DiscutionProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(DiscutionInterface::class, DiscutionRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
