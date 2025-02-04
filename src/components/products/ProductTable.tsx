import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Product } from "@/pages/ProductsPage";

interface ProductTableProps {
  products: Product[];
}

export const ProductTable = ({ products }: ProductTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Multi Product Code</TableHead>
            <TableHead>Twin Product Code</TableHead>
            <TableHead>Multi Standard Portion</TableHead>
            <TableHead>Twin Standard Portion</TableHead>
            <TableHead>Multi Large Portion</TableHead>
            <TableHead>Twin Large Portion</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.largeCode}</TableCell>
              <TableCell>{product.smallCode}</TableCell>
              <TableCell>
                {product.categories[1].portionSizes[0].smallEquivalent || "0"}
              </TableCell>
              <TableCell>
                {product.categories[1].portionSizes[1].smallEquivalent || "0"}
              </TableCell>
              <TableCell>
                {product.categories[0].portionSizes[0].smallEquivalent || "0"}
              </TableCell>
              <TableCell>
                {product.categories[0].portionSizes[1].smallEquivalent || "0"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};