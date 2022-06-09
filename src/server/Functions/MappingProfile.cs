using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Functions.Contracts;
using Models;
using Repository.DTO;
using DtoTxnSearchResults = Repository.DTO.TransactionSearchResponse;

namespace Functions
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<DtoTxnSearchResults, TransactionSearchResults>();
            CreateMap<DataCollection<TransactionDetail>, TransactionCollection>()
                .ForMember(dest => dest.TotalCount, opt => opt.MapFrom(src => src.TotalCount))
                .ForMember(dest => dest.Results, opt => opt.MapFrom((src, dest, i, context) => src.Results.Select(context.Mapper.Map<Transaction>)));

            CreateMap<TransactionDetail, Transaction>()
                .ForMember(dest => dest.SentBy, opt => opt.MapFrom(src => MapToNationSimplified(src.SentByNationId, src.SentByNationName, src.SentByRulerName, src.SentByAllianceName)))
                .ForMember(dest => dest.ReceivedBy, opt => opt.MapFrom(src => MapToNationSimplified(src.ReceivedByNationId, src.ReceivedByNationName, src.ReceivedByRulerName, src.ReceivedByAllianceName)))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => (AidStatus) src.Status))
                .ForMember(dest => dest.Code, opt => opt.MapFrom(src => new TransactionCode(src.Lu)));
        }

        private NationSimplified MapToNationSimplified(int? nationId, string nationName, string rulerName, string allianceName)
            => nationId.HasValue ? new NationSimplified(nationId.Value, nationName, rulerName, allianceName) : null;
    }
}