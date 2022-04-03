export default function CategoriesOptions(i, category) {
    return <option key={i} value={category.id}>
      {category.name}
    </option>
  }