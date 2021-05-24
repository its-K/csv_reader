package com.excel.excel;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import net.minidev.json.JSONObject;

@RestController
@CrossOrigin
public class ApiController {
    

    @GetMapping("/")
    public String kk(){
        return "kise";
    }

    @PostMapping("/upload")
    public List<JSONObject> fileupload(@RequestParam("file") MultipartFile file) throws IOException{
        file.transferTo(new File("/home/kishore/Works/csv_reader/"+file.getOriginalFilename()));
        List<JSONObject> Csvvalues=new ArrayList<>();
        try (BufferedReader br = Files.newBufferedReader(Paths.get("/home/kishore/Works/csv_reader/"+file.getOriginalFilename()))) {
            List <String> values=new ArrayList<>();
            String line;
            if((line = br.readLine())!=null){
                for(String value:line.split(",")){
                    values.add(value);
                }
            }
            while ((line = br.readLine()) != null) {
                JSONObject obj = new JSONObject();
                String[] columns = line.split(",");
                for(int index=0;index<columns.length;index++){
                    obj.put(values.get(index), columns[index]);
                }
                Csvvalues.add(obj);
            }
        
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        return Csvvalues;
    }
}
