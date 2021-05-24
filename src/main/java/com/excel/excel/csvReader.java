package com.excel.excel;

import org.springframework.web.multipart.MultipartFile;
import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

public class csvReader {
    public List<List<String>> parseCsv(MultipartFile file) throws IOException{
        List<List<String>> Csvvalues=new ArrayList<>();
        file.transferTo(new File("/home/kishore/Works/csv_reader/"+file.getOriginalFilename()));
        try (BufferedReader br = Files.newBufferedReader(Paths.get("/home/kishore/Works/csv_reader/"+file.getOriginalFilename()))) {
            String line;
            while ((line = br.readLine()) != null) {
                List<String> obj = new ArrayList<>();
                String[] columns = line.split(",");
                for(String val:columns){
                    obj.add(val);
                }
                Csvvalues.add(obj);
            }
        
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        return Csvvalues;
    }
}
