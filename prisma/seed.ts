import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const questions = [
    { optionA: 'Café', optionB: 'Chá' },
    { optionA: 'Gatos', optionB: 'Cães' },
    { optionA: 'Pizza', optionB: 'Sushi' },
    { optionA: 'Verão', optionB: 'Inverno' },
    { optionA: 'Vôlei', optionB: 'Futebol' },
  ];

  for (const q of questions) {
    await prisma.question.create({
      data: q,
    });
  }

  console.log('Banco de dados populado com perguntas iniciais.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });