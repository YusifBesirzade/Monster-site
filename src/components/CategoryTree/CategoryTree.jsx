import React, { useState } from 'react'
import CategoryItem from '../CategoryItem/CategoryItem'

function CategoryTree({ categories }) {
    const [openCategory, setOpenCategory] = useState(null)

    return (
        <div className='flex flex-col gap-2 px-4'>
            {categories.map(category => (
                <CategoryItem key={category.id} category={category}
                    isOpen={openCategory === category.id} setOpenCategory={setOpenCategory} />
            ))}
        </div>
    )
}

export default CategoryTree