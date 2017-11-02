import { Component, AfterViewInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'messagecomponent',
    template: require('./message.component.html')
})

export class MessageComponent implements AfterViewInit {
    sub: any;
    profileId: number = 0;
    model: FormGroup;
    messages: any[] = [];

    constructor(private messageService: MessageService, private fb: FormBuilder) { }

    ngOnInit() {
        this.model = this.fb.group({
            content: ['']
        });
    }

    ngAfterViewInit() {
        this.messageService.getConversationsByUser(1).subscribe(
            data => {
                this.messages = data;
            });
    }
}