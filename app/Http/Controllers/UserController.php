<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Resources\AuthUserResource;
use Spatie\Permission\Models\Role;
use App\Enum\RolesEnum;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::where('id', '!=', 1)
        ->where('id', '!=', 2)
        ->where('id', '!=', 3)
        ->get();

        return Inertia::render('User/Index', [
            'users' => AuthUserResource::collection($users)->collection->toArray(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        if($user->id == 1 || $user->id == 2 || $user->id == 3) {
            return back()->with('error', 'You are not allowed to edit this user');
        }
        
        return Inertia::render('User/Edit', [
            'user' => new AuthUserResource($user),
            'roles' => Role::all(),
            'roleLabels' => RolesEnum::labels(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'roles' => ['required', 'array'],
        ]);

        $user->syncRoles($data['roles']);

        return back()->with('success', 'Role updated successfully');
    }
}
