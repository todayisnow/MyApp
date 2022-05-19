using MediatR;
using Ordering.Application.Features.Orders.Models;
using System.Collections.Generic;

namespace Ordering.Application.Features.Orders.Queries.GetOrders
{
    public class GetOrdersQuery : IRequest<List<OrdersVm>>
    {


        public GetOrdersQuery()
        {

        }
    }
}
