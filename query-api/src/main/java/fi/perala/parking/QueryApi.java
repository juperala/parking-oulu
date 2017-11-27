package fi.perala.parking;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;

/**
 * Created by juperala on 30.10.2016.
 */
public class QueryApi {
    public void myHandler(int myCount, Context context) {
        LambdaLogger logger = context.getLogger();
        logger.log("Data update invoked.");
    }
}
