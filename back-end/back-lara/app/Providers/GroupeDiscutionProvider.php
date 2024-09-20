<?php

namespace App\Providers;

use App\Interfaces\GroupeDiscutionInterface;
use App\Repositories\GroupeDiscutionIRepository;
use Illuminate\Support\ServiceProvider;

class GroupeDiscutionProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(GroupeDiscutionInterface::class, GroupeDiscutionIRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
