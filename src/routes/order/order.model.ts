import { z } from 'zod';

import { ORDER_STATUS } from 'src/shared/constants/order.constant';
import { PaginationQuerySchema, PaginationSchema } from 'src/shared/models/pagination.model';

const OrderStatusSchema = z.enum([
  ORDER_STATUS.PENDING_PAYMENT,
  ORDER_STATUS.PENDING_PICKUP,
  ORDER_STATUS.PENDING_DELIVERY,
  ORDER_STATUS.DELIVERED,
  ORDER_STATUS.RETURNED,
  ORDER_STATUS.CANCELLED,
]);

export const OrderSchema = z.object({
  id: z.number(),
  userId: z.number(),
  status: OrderStatusSchema,
  receiver: z.object({
    name: z.string(),
    phone: z.string(),
    address: z.string(),
  }),
  shopId: z.number().nullable(),

  createdById: z.number().nullable(),
  updatedById: z.number().nullable(),
  deletedById: z.number().nullable(),
  deletedAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const ProductSKUSnapshotSchema = z.object({
  id: z.number(),
  productId: z.number().nullable(),
  productName: z.string(),
  productTranslations: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      description: z.string(),
      languageId: z.string(),
    }),
  ),
  skuPrice: z.number(),
  image: z.string(),
  skuValue: z.string(),
  skuId: z.number().nullable(),
  orderId: z.number().nullable(),
  quantity: z.number(),

  createdAt: z.date(),
});

export const GetOrderListResSchema = PaginationSchema.extend({
  data: z.array(
    OrderSchema.extend({
      items: z.array(ProductSKUSnapshotSchema),
    }).omit({
      receiver: true,
      deletedAt: true,
      deletedById: true,
      createdById: true,
      updatedById: true,
    }),
  ),
  totalItems: z.number(),
});

export const GetOrderListQuerySchema = PaginationQuerySchema.extend({
  status: OrderStatusSchema.optional(),
});

export const GetOrderDetailResSchema = OrderSchema.extend({
  items: z.array(ProductSKUSnapshotSchema),
});

export const CreateOrderBodySchema = z
  .array(
    z.object({
      shopId: z.number(),
      receiver: z.object({
        name: z.string(),
        phone: z.string().min(9).max(20),
        address: z.string(),
      }),
      cartItemIds: z.array(z.number()).min(1),
    }),
  )
  .min(1);

export const CreateOrderResSchema = z.object({ data: z.array(OrderSchema) });

export const CancelOrderResSchema = OrderSchema;

export const GetOrderParamsSchema = z
  .object({
    orderId: z.coerce.number().int().positive(),
  })
  .strict();

export type OrderType = z.infer<typeof OrderSchema>;
export type GetOrderListResType = z.infer<typeof GetOrderListResSchema>;
export type GetOrderListQueryType = z.infer<typeof GetOrderListQuerySchema>;
export type GetOrderDetailResType = z.infer<typeof GetOrderDetailResSchema>;
export type GetOrderParamsType = z.infer<typeof GetOrderParamsSchema>;
export type CreateOrderBodyType = z.infer<typeof CreateOrderBodySchema>;
export type CreateOrderResType = z.infer<typeof CreateOrderResSchema>;
export type CancelOrderResType = z.infer<typeof CancelOrderResSchema>;
