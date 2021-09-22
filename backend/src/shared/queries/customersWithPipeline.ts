export function customersWithOrdersPipeline(search: string) {
  return [
    ...(
      search 
        ? [{ $match: { name: new RegExp(search, 'i') } }] 
        : []
    ),
    {
      $lookup: {
        from: 'orders',
        let: { customerId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ['$customer', '$$customerId'] }
            }
          },
          {
            $sort: { boughtAt: 1 }
          },
          {
            $lookup: {
              from: 'bonds',
              foreignField: '_id',
              localField: 'bond',
              as: 'bond'
            }
          },
          { $unwind: '$bond' }
        ],
        as: 'orders'
      },
    },
    {
      $sort: {
        name: 1
      }
    }
  ]
} 