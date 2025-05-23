import { BadRequestException, NotFoundException } from '@nestjs/common';

export const CannotGetPaymentIdException = new BadRequestException('Cannot get payment id');

export const PaymentNotFoundException = new NotFoundException('Payment not found');

export const NotMatchPaymentAmountException = ({
  transferAmount,
  expectedAmount,
}: {
  transferAmount: number;
  expectedAmount: number;
}) => new BadRequestException(`Transfer amount ${transferAmount} does not match expected amount ${expectedAmount}`);

export const PaymentAlreadyProcessedException = new BadRequestException('Payment already processed');

export const PaymentTransactionAlreadyExistsException = new BadRequestException('Payment transaction already exists');
