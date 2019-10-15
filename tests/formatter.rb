class CustomFormatter < RSpec::Core::Formatters::DocumentationFormatter
    RSpec::Core::Formatters.register self

    def dump_summary notification
    end

    
    def start notification
    end
    
    def example_group_started notification
        @passes = []
        @failures = []
    end

    def passed_output(notification)
        @passes << notification.description
        nil
    end
  
    def pending_output(example, _message)        
    end
  
    def failure_output(notification)
        @failures << [notification.description , notification.execution_result.exception.message.gsub(/\n/,"")]
        nil
    end
  

    def close notification
        # print @passes.length
        print '{ "passes": ' + @passes.to_s + ', "failures": ' + @failures.to_s + '}'
    end

    def dump_failures notification

    end
 end