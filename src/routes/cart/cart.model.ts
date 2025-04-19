import { z } from 'zod';

import { PaginationSchema } from 'src/shared/models/pagination.model';
import { ProductTranslationSchema } from 'src/shared/models/share-product-translation.model';
import { ProductSchema } from 'src/shared/models/shared-product.model';
import { SKUSchema } from 'src/shared/models/shared-sku.model';
import { UserSchema } from 'src/shared/models/shared-user.model';

export const CartItemSchema = z.object({
  id: z.number(),
  quantity: z.number(),
  skuId: z.number(),
  userId: z.number(),

  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const GetCartItemParamsSchema = z
  .object({
    cartItemId: z.coerce.number().int().positive(),
  })
  .strict();

export const CartItemDetailSchema = z.object({
  shop: UserSchema.pick({
    id: true,
    name: true,
    avatar: true,
  }),
  cartItems: z.array(
    CartItemSchema.extend({
      sku: SKUSchema.extend({
        product: ProductSchema.extend({
          productTranslations: z.array(
            ProductTranslationSchema.omit({
              createdById: true,
              updatedById: true,
              deletedById: true,
              deletedAt: true,
              createdAt: true,
              updatedAt: true,
            }),
          ),
        }).omit({
          createdById: true,
          updatedById: true,
          deletedById: true,
          deletedAt: true,
          createdAt: true,
          updatedAt: true,
        }),
      }).omit({
        createdById: true,
        updatedById: true,
        deletedById: true,
        deletedAt: true,
        createdAt: true,
        updatedAt: true,
      }),
    }),
  ),
});

export const GetCartResSchema = PaginationSchema.extend({
  data: z.array(CartItemDetailSchema),
  totalItems: z.number(),
});

export const AddToCartBodySchema = z
  .object({
    skuId: z.number(),
    quantity: z.number(),
  })
  .strict();

export const UpdateCartItemBodySchema = AddToCartBodySchema;

export const DeleteCartBodySchema = z
  .object({
    cartItemIds: z.array(z.number().int().positive()),
  })
  .strict();

export type CartItemType = z.infer<typeof CartItemSchema>;
export type GetCartItemParamsType = z.infer<typeof GetCartItemParamsSchema>;
export type CartItemDetailType = z.infer<typeof CartItemDetailSchema>;
export type GetCartResType = z.infer<typeof GetCartResSchema>;
export type AddToCartBodyType = z.infer<typeof AddToCartBodySchema>;
export type UpdateCartItemBodyType = z.infer<typeof UpdateCartItemBodySchema>;
export type DeleteCartBodyType = z.infer<typeof DeleteCartBodySchema>;
