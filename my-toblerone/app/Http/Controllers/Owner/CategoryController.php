<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Http\Requests\Owner\StoreCategoryRequest;
use App\Http\Requests\Owner\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Models\Restaurant;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(Request $request, Restaurant $restaurant)
    {
        $this->authorizeRestaurantOwnership($request, $restaurant);

        return CategoryResource::collection($restaurant->categories()->get());
    }

    public function store(StoreCategoryRequest $request, Restaurant $restaurant)
    {
        $this->authorizeRestaurantOwnership($request, $restaurant);

        $category = $restaurant->categories()->create($request->validated());

        return new CategoryResource($category);
    }

    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $this->authorizeCategoryOwnership($request, $category);

        $category->update($request->validated());

        return new CategoryResource($category);
    }

    public function destroy(Request $request, Category $category)
    {
        $this->authorizeCategoryOwnership($request, $category);

        $category->delete();

        return response()->json(null, 204);
    }

    private function authorizeRestaurantOwnership(Request $request, Restaurant $restaurant): void
    {
        abort_if(
            $restaurant->owner_id !== $request->user()->id,
            403,
            'You do not own this restaurant.'
        );
    }

    private function authorizeCategoryOwnership(Request $request, Category $category): void
    {
        abort_if(
            $category->restaurant->owner_id !== $request->user()->id,
            403,
            'You do not own this category.'
        );
    }
}
