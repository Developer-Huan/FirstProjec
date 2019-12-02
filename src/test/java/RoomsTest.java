import com.example.service.InRoomInfoService;
import com.example.service.impl.InRoomInfoServiceImpl;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * @Author: 刘欢
 * @Date: 2019/11/17 14:23
 */
public class RoomsTest {

    //日志对象
    private static final Logger log = LogManager.getLogger(RoomsTest.class);

    //依赖引入员工业务层对象
    private InRoomInfoServiceImpl inRoomInfoService;

    //读取spring.xml文件
    @Before
    public void init() {
        ClassPathXmlApplicationContext cxt = new ClassPathXmlApplicationContext("spring-config.xml");
        inRoomInfoService = cxt.getBean("inRoomInfoServiceImpl", InRoomInfoServiceImpl.class);
    }

    @Test
    public void test01(){
//        inRoomInfoService.test();
    }

}
