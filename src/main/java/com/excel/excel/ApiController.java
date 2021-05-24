package com.excel.excel;

import java.io.IOException;
import java.util.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin
public class ApiController {  

    @GetMapping("/")
    public String kk(){
        return "kise";
    }

    @PostMapping("/upload")
    public List<List<String>> fileupload(@RequestParam("file") MultipartFile file) throws IOException{
        csvReader app=new csvReader();
        List <List<String>> Csvvalues=app.parseCsv(file);
        return Csvvalues;
    }
}
