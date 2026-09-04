<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Http\Requests\Owner\StoreMenuItemRequest;
use App\Http\Requests\Owner\UpdateMenuItemRequest;
use App\Http\Resources\MenuItemResource;
use App\Models\Category;
use App\Models\MenuItem;
use Illuminate\Http\Request;

class MenuItemController extends Controller
{
    public function index(Request $request, Category $category)
    {
        $this->authorizeCategoryOwnership($request, $category);

        return MenuItemResource::collection($category->menuItems);
    }

    public function store(StoreMenuItemRequest $request, Category $category)
    {
        $this->authorizeCategoryOwnership($request, $category);

        $menuItem = $category->menuItems()->create($request->validated());

        return new MenuItemResource($menuItem);
    }

    public function update(UpdateMenuItemRequest $request, MenuItem $menuItem)
    {
        $this->authorizeMenuItemOwnership($request, $menuItem);

        $menuItem->update($request->validated());

        return new MenuItemResource($menuItem);
    }

    public function destroy(Request $request, MenuItem $menuItem)
    {
        $this->authorizeMenuItemOwnership($request, $menuItem);

        $menuItem->delete();

        return response()->json(null, 204);
    }

    private function authorizeCategoryOwnership(Request $request, Category $category): void
    {
        abort_if(
            $category->restaurant->owner_id !== $request->user()->id,
            403,
            'You do not own this category.'
        );
    }

    private function authorizeMenuItemOwnership(Request $request, MenuItem $menuItem): void
    {
        abort_if(
            $menuItem->category->restaurant->owner_id !== $request->user()->id,
            403,
            'You do not own this menu item.'
        );
    }
}
