import java.util.ArrayList;
import java.util.Arrays;

public class HolaMundo {
   
    public static String message(String logLine) {
        String[] mensaje = logLine.split(":");
        return mensaje[1].trim();
    }

    public static String logLevel(String logLine) {
        String[] levels = {"INFO", "WARNING", "ERROR"};
        String result = "";
        for(int i=0, n=levels.length; i < n; i++) {
            if (logLine.indexOf(levels[i]) != -1) {
                result = levels[i];
            }
        }
        return result.toLowerCase();
    }

    public static String reformat(String logLine) {
        String info = message(logLine);
        String level = logLevel(logLine);
        return String.format("%s (%s)", info, level);
    }

    public static void chars_example() {
        String logLine= "my    hom4e   ..#)*@camb7";
        logLine = logLine.replace(' ', '_');
        String[] parts = logLine.split("[_]+");
        String camelCase = parts[0];
        for (int i=1, n=parts.length; i < n; i++) {
            camelCase += parts[i].substring(0, 1).toUpperCase() + parts[i].substring(1);
        }
        // System.out.println(camelCase);
        String[] nums = {"4", "3", "0", "1", "7"};
        String[] letters = {"a", "e", "o", "l", "t"};
        
        for (int i=0, n=nums.length; i < n; i++) {
            camelCase = camelCase.replace(nums[i], letters[i]);
        }
        String cleanNoLetters = camelCase.replaceAll("[^\\w]", "");
        System.out.println(cleanNoLetters);

       

    }

    public static String clean(String logLine) {
        String result = "";
        if (logLine.contains(" ") && !logLine.matches(".*\\d.*")) { // 'espaces' -> '___'
            result = logLine.replace(' ', '_');
        }  
        if (result.contains( "-")) { // camelCase
            String[] parts = result.split("[-]+");
            String camelCase = parts[0];
            for (int i=1, n=parts.length; i < n; i++) {
                camelCase += parts[i].substring(0, 1).toUpperCase() + parts[i].substring(1);
            }
            result = camelCase;
            System.out.println("camelCase: " + result);
        } 
         if (result.matches(".*\\d.*")) { // 'numbers' -> 'letters'
            String[] nums = {"4", "3", "0", "1", "7"};
            String[] letters = {"a", "e", "o", "l", "t"};
            for (int i=0, n=nums.length; i < n; i++) {
                result = result.replace(nums[i], letters[i]);
            }
        } else if (result.matches(".*[^\\w].*")) { // 'delete symbols'
            result = result.replaceAll("[^\\w]", "");
        }

        return result;
    }


    public static void main(String[] args) {
       System.out.println("Hola Mundo");
       System.out.println(logLevel("[]: You are perfect!"));
       System.out.println(reformat("[ERROR]: you are great!"));
       // Casteo: double -> int
       System.out.println((int) 2.23);
    //    chars_example();
        System.out.println(clean("H4llo World "));
    }
}

