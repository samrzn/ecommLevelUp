use("ecomm");

const estatisticaUsuario = db.orders.aggregate([
    {
        $match: {
            'account.nomeCliente': 'Bryan Thomas Ribeiro'
        }
    },
    {
        $unwind: {
            'path': '$itensPedido'
        }
    },
    {
        $group: {
            '_id': 'null',
            'itensQuantidade': {
                $sum: '$itensPedido.quantidade'
            },
            'totalPedido': {
                $sum: {
                    $multiply: [
                        '$itensPedido.precoUnitario', '$itensPedido.quantidade'
                    ]
                }
            },
            'descontoTotal': {
                $sum: '$itensPedido.desconto'
            }
        }
    }
]);


console.log(estatisticaUsuario);