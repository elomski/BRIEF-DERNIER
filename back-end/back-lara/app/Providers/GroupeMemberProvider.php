<?php

namespace App\Providers;

use App\Interfaces\GroupeMemberInterface;
use App\Repositories\GroupeMemberRepository;
use Illuminate\Support\ServiceProvider;

class GroupeMemberProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(GroupeMemberInterface::class, GroupeMemberRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
