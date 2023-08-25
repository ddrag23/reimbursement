<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        return inertia('User/Index');
    }
}
