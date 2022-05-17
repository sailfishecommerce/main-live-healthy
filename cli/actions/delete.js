const { bold, dim } = require('kleur')

async function deleteAction(productsIndices) {
  const [productsIndex] = productsIndices

  // Products index - Unlink replicas
  console.info(dim('Unlink replicas...'))
  await productsIndex.setSettings({ replicas: [] }).wait()

  await Promise.all(
    productsIndices.map((productIndex) => productIndex.delete())
  )

  console.info(bold().green('✔ Datasets deleted'))
}

module.exports = deleteAction
