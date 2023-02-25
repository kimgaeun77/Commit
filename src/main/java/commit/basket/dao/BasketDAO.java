package commit.basket.dao;

import commit.etc.dao.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class BasketDAO extends AbstractDAO{
	
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> selectBasketList(Map<String, Object> map) throws Exception{
		return (List<Map<String, Object>>)selectList("basket.selectBasketList", map);
	}
	
	public void updateBasket(Map<String, Object> map) throws Exception{
		update("basket.updateBasket", map);
	}
	
	public void deleteBasket(Map<String, Object> map) throws Exception{
		delete("basket.deleteBasket", map);
	}
	
	public void clearBasket(Map<String, Object> map) {
		delete("basket.clearBasket", map);
	}
	
	public void insertBasket(Map<String, Object> map) {
		insert("basket.insertBasket", map);
		
	}
	
	public int checkBasket(Map<String, Object> map) {
		return (Integer)selectOne("basket.checkBasket",map);
	}
	
	public void updateAmount(Map<String, Object> map) {
		update("basket.updateAmount", map);
	}
	
}
