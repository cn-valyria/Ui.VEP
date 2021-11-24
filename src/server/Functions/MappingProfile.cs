using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Functions.Contracts;
using Models;
using Repository.DTO;

namespace Functions
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<(int ResultsCount, IEnumerable<TransactionDetail> Results), TransactionSearchResults>()
                .ForMember(dest => dest.TotalCount, opt => opt.MapFrom(src => src.ResultsCount))
                .ForMember(dest => dest.Results, opt => opt.MapFrom((src, dest, i, context) => 
                {
                    return src.Results.Select(context.Mapper.Map<Transaction>);
                }));

            CreateMap<TransactionDetail, Transaction>()
                .ForMember(dest => dest.SentBy, opt => opt.MapFrom(src => new NationSimplified(src.SentByNationId, src.SentByNationName, src.SentByRulerName, src.SentByAllianceName)))
                .ForMember(dest => dest.ReceivedBy, opt => opt.MapFrom(src => new NationSimplified(src.ReceivedByNationId, src.ReceivedByNationName, src.ReceivedByRulerName, src.ReceivedByAllianceName)))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => (AidStatus) src.Status))
                .ForMember(dest => dest.Code, opt => opt.MapFrom(src => new TransactionCode(src.Lu)));
        }
    }
}