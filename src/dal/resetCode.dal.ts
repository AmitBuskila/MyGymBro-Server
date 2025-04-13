import { LessThan } from 'typeorm';
import { ResetCode } from '../entities/resetCode.entity';
import { AppDataSource } from '../helpers/dataSource';
import { User } from '../entities/user.entity';

const resetCodeRepository = AppDataSource.getRepository(ResetCode);

export const getLatestUserCode = async (
  userId: number,
): Promise<ResetCode | null> => {
  return resetCodeRepository
    .createQueryBuilder('resetCode')
    .where('resetCode.userId = :userId', { userId })
    .andWhere('resetCode.expiration > :now', { now: new Date() })
    .orderBy('resetCode.expiration', 'DESC')
    .getOne();
};

export const updateResetCode = async (
  updateResetCodeInput: any,
  userId: number,
) => {
  const resetCodeEntity: ResetCode =
    (await getLatestUserCode(userId)) || new ResetCode();
  if (!resetCodeEntity.user?.id) {
    resetCodeEntity.user = { id: userId } as User;
  }
  Object.assign(resetCodeEntity, updateResetCodeInput);
  return resetCodeRepository.save(resetCodeEntity);
};

export const deleteExpiredCodes = async () =>
  resetCodeRepository.delete({
    expiration: LessThan(new Date()),
  });
