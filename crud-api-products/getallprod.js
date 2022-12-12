async function getAllProduct(){
    const params={
        TableName: dynamodbTableName
    }
    const allProducts=await scanDynamoRecords(params,[]);
    const body={
        products: allProducts
    }
    return buildResponse(200,body);
}

async function scanDynamoRecords(scanParams,itemArray){
    try{
        const dynamoData= await dynamodb.scan(scanParams).promise();
        itemArray = itemArray.concat(dynamoData.Items);
        if(dynamoData.LastEvaluateKey){
            scanParams.ExclusiveStartKey = dynamoData.LastEvaluateKey;
            return await scanDynamoRecords(scanParams,itemArray);
        }
        return itemArray;
    }catch(error){
        console.log('Do your custome error handling here. I am just gonna log it: ',error);
    }
}