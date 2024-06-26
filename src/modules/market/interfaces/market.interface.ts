import { Market } from "../schema/market.schema";
import { CreateMarketDto } from "../dto/market.dto";
import { UpdateMarketDto } from "../dto/updateMarket.dto";
export interface MarketServiceInterface {
    createMarket(createmarketDto: CreateMarketDto): Promise<Market>;
    getsMarkets(page: number, limit: number): Promise<Market[]>;
    getUserById(id: number): Promise<Market>;
    updateUser(id: number, updateMarketDto: UpdateMarketDto): Promise<Market>;
    deleteUser(id: number): Promise<Market>;
    searchMarket(searchTerm: string): Promise<Market[]>;
}