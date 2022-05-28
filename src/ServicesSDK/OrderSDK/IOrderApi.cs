namespace OrderSDK
{
    internal class IOrderApi
    {
        [Post("api/v1/order/GetOrder")]
        Task<ApiResponse<IEnumerable<OrdersVm>>>
    }
}
